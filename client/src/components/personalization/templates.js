// Packages
import React from 'react';
import shortid from 'shortid';

// import all templates from templates directory
import A300x250 from '../../templates/display/a/300x250/index'
import A300x600 from '../../templates/display/a/300x600/index'
import A160x600 from '../../templates/display/a/160x600/index'
import A728x90 from '../../templates/display/a/728x90/index'

import B300x250 from '../../templates/display/b/300x250/index'
import B300x600 from '../../templates/display/b/300x600/index'
import B160x600 from '../../templates/display/b/160x600/index'
import B728x90 from '../../templates/display/b/728x90/index'

import C300x250 from '../../templates/display/c/300x250/index'
import C300x600 from '../../templates/display/c/300x600/index'
import C160x600 from '../../templates/display/c/160x600/index'
import C728x90 from '../../templates/display/c/728x90/index'

class Templates extends React.Component {

  render() {
    const { selectedTemplate } = this.props;
    let content;

      if (selectedTemplate && selectedTemplate.sizes !== undefined){
        // eslint-disable-next-line
        content = Object.keys(selectedTemplate.sizes).map((key, index) => {
          if (!selectedTemplate.sizes[key].active) return false;
          switch (key) {
            case '300x250':
              if (selectedTemplate.name === "Branded Campaigns")  return <A300x250 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "Pricing Events")     return <B300x250 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "General Campaigns")  return <C300x250 key={shortid.generate()} {...this.props} />
              break;

            case '160x600':
              if (selectedTemplate.name === "Branded Campaigns")  return <A160x600 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "Pricing Events")     return <B160x600 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "General Campaigns")  return <C160x600 key={shortid.generate()} {...this.props} />
              break;

            case '300x600':
              if (selectedTemplate.name === "Branded Campaigns")  return <A300x600 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "Pricing Events")     return <B300x600 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "General Campaigns")  return <C300x600 key={shortid.generate()} {...this.props} />
              break;

            case '728x90':
              if (selectedTemplate.name === "Branded Campaigns")  return <A728x90 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "Pricing Events")     return <B728x90 key={shortid.generate()} {...this.props} />
              if (selectedTemplate.name === "General Campaigns")  return <C728x90 key={shortid.generate()} {...this.props} />
              break;

            default:
              return 'No Templates Available.'
          }
      });

    }

     else {
      content = <div className='text-center mb-5'>No Template Selected. Please select template in previous steps.</div>;
    }
    
    return(
      <div className='d-flex flex-wrap justify-content-center mb-5'>
        {content}
      </div>
    )
  }
}



export default Templates;
