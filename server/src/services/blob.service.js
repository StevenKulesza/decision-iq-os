import azureConfig from '../config/azure'
import fs from 'fs';
import storage from 'azure-storage'
import formidable from 'formidable';
import mkdirp from 'mkdirp';
import jimp from 'jimp';

// controllers
import ImageUpload from '../controllers/imageupload.controller';

// Global request options, set the retryPolicy
const blobService = storage.createBlobService(azureConfig.accountName, azureConfig.accountKey).withFilter(new storage.ExponentialRetryPolicyFilter());
const containerName = "dco-cdn";

module.exports = (() => {
	let _methods = {
		generateBlobSasUrl: (blobPath) => {
			const startDate = new Date();
			const expiryDate = new Date(startDate);

			expiryDate.setMinutes(startDate.getMinutes() + 1000);
			startDate.setMinutes(startDate.getMinutes() - 1000);

			const sharedAccessPolicy = {
				AccessPolicy: {
					Permissions: storage.BlobUtilities.SharedAccessPermissions.READ,
					Start: startDate,
					Expiry: expiryDate
				}
			}
			const token = blobService.generateSharedAccessSignature(containerName, blobPath, sharedAccessPolicy);
			const sasUrl = blobService.getUrl(containerName, blobPath, token);

			return sasUrl;
		},

		// Create a container for organizing blobs within the storage account.
		createContainer: (req, res) => {
			console.log('trying to create container')
			blobService.createContainerIfNotExists(containerName, (error) => {
				if (error != null) {
					return res.status(401).json({
						message: 'Cannot create container - Inadequate Permissions.'
					})
				} else {
					return res.status(200).json({
						message: 'Container created or already exists.'
					})
				}
			})
		},
		// Upload a BlockBlob to container
		uploadBlob: (req, res) => {
			const date = new Date();
			const dateFormatted = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
			const form = new formidable.IncomingForm();

			form.parse(req, function (err, fields, files) {
				if(!files.image) return res.status(500).json({
					message: 'Error: no image provided'
				});

				const imgPath = files.image.path;
				const clientName = fields.client;
				const flightName = fields.flight;
				const blobName = clientName + "/" + flightName + "/" + files.image.name;
				// const thumbnailName = blobName.substr(0, blobName.lastIndexOf(".")) + ".thumb" + blobName.substr(blobName.lastIndexOf("."));
				const options = {
					metadata: {
						filename: files.image.name,
						filesize: files.image.size,
						filemodified: dateFormatted,
						filetype: files.image.type,
						//fileThumbnail: thumbnailName,
						filecategory: fields.category
					}
				}

				ImageUpload.creatImageUpload(files.image.name, clientName, flightName, blobName, options.metadata, ['image'])
					.then(() => {
						blobService.createBlockBlobFromLocalFile(containerName, blobName, imgPath, options, (error, result) => {
							if (error != null) {
								return res.status(401).json({
									message: 'Cannot upload Blob.'
								})
							} else {
								// Set access permissions
								//setPermissions();
								
								//_methods.createBlobThumbnail(imgPath, thumbnailName);
								
								return res.status(200).json({
									message: 'Blob created'
								})
							}
						});
					})
					.catch(err => {
						return res.status(401).json({
							message: err
						});
					});

				
	
				function setPermissions() {
					var options = { publicAccessLevel: azure.BlobUtilities.BlobContainerPublicAccessType.BLOB };
					blobService.setContainerAcl(containerName, null, options, function (error) {
						if (error) {
						console.log(error);
						} 
					});
				}
			});			
		},

		createBlobThumbnail: (imgPath, thumbnailName) => {
			jimp.read(imgPath)
				.then(image => {
					console.log("Do stuff to thumb");
					return image
						.resize(256, 256) // resize
						.quality(70) // set JPEG quality
						.getBase64(jimp.MIME_JPEG, (error, imageText) => {
							if (error) {
								context.log(error);
							}
							else {
								const matches = imageText.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
								const type = matches[1];
								const buffer = new Buffer(matches[2], 'base64');

								blobService.createBlockBlobFromText(containerName, thumbnailName, buffer, {contentType:type}, (error) => {
									console.log(error);
								} )
							}
						});
				})
				.catch(err => {
					console.log(err);
				});
		},

		
		// List all blobs in container
		listBlobs: (req, res) => {

			var responseJSON = [];
			var querySelector = {};
			if(req.query.client) querySelector.clientName = req.query.client;
			if(req.query.client && req.query.flight) querySelector.flightName = req.query.flight;

			ImageUpload.getImageUploads(querySelector)
			.then(images => {
				images.map(image => {
					var url = _methods.generateBlobSasUrl(image.blobPath);

					var imageJSON = {
						image: url,
						metadata: image.metadata,
						dateUploaded: image.dateUploaded,
						tags: image.tags
					};

					responseJSON.push(imageJSON);
				});
				res.status(200).json(responseJSON);
			})
			.catch(err => {
				res.status(404).json({
					message: err
				});
			});
			
			// listBlobs(blobService, containerName, null, {include: "metadata"}, null, (error, results) => {
			// 	if (!error) {
			// 		console.log('blobs listed')
			// 	}
			// 	var responseJSON = [];
			// 	for (let i = 0; i < results.length; i++) {
			// 		var result = results[i];
			// 		var name = results[i].name;

			// 		var url = _methods.generateBlobSasUrl(results[i].name);
			// 		//var thumb = result.metadata.filethumbnail ? _methods.generateBlobSasUrl(result.metadata.filethumbnail) : "";
			// 		var resultJSON = {
			// 			image: url,
			// 			//thumb: thumb,
			// 			metadata: result.metadata
			// 		};
			// 		responseJSON.push(resultJSON);
					
			// 	}
			// 	res.status(200).json(responseJSON);
			// })

			function listBlobs(blobService, container, token, options, blobs, callback) {
				blobs = blobs || [];

				blobService.listBlobsSegmented(container, token, options, function (error, result) {
					if (!error) {
						console.log('blobs listed')
					}

					if(result == null) return callback(null, blobs);
					blobs.push.apply(blobs, result.entries);
					var token = result.continuationToken;
					if (token) {
						console.log('   Received a segment of results. There are ' + result.entries.length + ' blobs on this segment.');
						listBlobs(blobService, container, token, options, blobs, callback);
					} else {
						console.log('   Completed listing. There are ' + blobs.length + ' blobs.');
						callback(null, blobs);
					}
				});
			}
		},


		// Download a blob to file system
		downloadBlob: (req, res) => {
			//TODO: use this function to zip up everything
			_methods.downloadBlobToFS("clientName/flightName/squint.jpg", "src/public/images/test")
			.then(() => {
				res.status(200).json({"message":"downloaded"});
			})
			.catch(() => {
				res.status(400).json({"message":"error"});
			});
			
		},

		// Download a blob to file system
		downloadBlobToFS: (blobName, localDirectory) => {
			return new Promise((resolve, reject)=>{
				const localName = localDirectory + "/"+ blobName.substr(blobName.lastIndexOf("/"), blobName.length);

				blobService.getBlobProperties(containerName, blobName, (error, result) => {
					if(result){
						//make sure directory exists
						mkdirp(localDirectory, (err) => {
							//create image on server
							blobService.getBlobToStream(containerName, blobName, fs.createWriteStream(localName), function(error, result, response){
								if(!error) resolve();
								else reject();
							})
						});
					}else{
						//there is no blob 
						reject();
					}
				});
			});
		},

		// Delete a blob
		deleteBlob: (req, res) => {
			blobService.deleteBlob(containerName, req.body.blobName, function (error) {
				if (error != null) {
					return res.status(401).json({
						message: 'Cannot delete blob - Inadequate Permissions or Blob does not exist.'
					})
				} else {
					console.log('deleted' + req.params.blobName)
					ImageUpload.deleteImageUploadByBlobName(req.body.blobName);
					return res.status(202).json({
						message: 'Blob deleted'
					})
				}
			});
		}
	}

	// return private methods
	return {
		createContainer: _methods.createContainer,
		uploadBlob: _methods.uploadBlob,
		listBlobs: _methods.listBlobs,
		downloadBlob: _methods.downloadBlob,
		deleteBlob: _methods.deleteBlob
	}
})();