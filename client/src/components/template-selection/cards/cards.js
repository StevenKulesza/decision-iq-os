import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardSubtitle } from 'reactstrap'
import { css } from 'emotion'
import shortid from 'shortid'

// Components and Styles
import * as styles from '../../../styles/card/card'

const DataCard = (props) => {
  return (
    <div>
      <Link onClick={props.onClick} to={{ pathname: props.url }}>
        <Card className={css`${styles.card}` + ' p-4 ' + props.class} >
          <CardImg top width="100%" className="rounded-0" src={props.imageUrl} alt={props.title} />
          <CardBody className='pl-0 pb-0'>
            <h4  className='mb-2'>{props.title}</h4>
            <CardSubtitle>{props.subtitle}</CardSubtitle>
            <CardText>{props.description}</CardText>
            {props.sizes && Object.keys(props.sizes).length > 1 &&
              <div>
                <strong>Sizes included</strong>

                <ul>
                {Object.keys(props.sizes).map((s, index) => (
                 <li key={shortid.generate()}>{s}</li>
                ))}
                </ul>
              </div>
            }
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default DataCard;
