import storage from 'azure-storage'


// Reads the azure storage configurations
function readConfig() {
    var config = process.env.AZURE_CONFIGURATION;
    if (config.useDevelopmentStorage) {
        config.connectionString = storage.generateDevelopmentStorageCredentials();
    }
    return config;
}

module.exports = readConfig();
