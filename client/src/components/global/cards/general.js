import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { css } from 'emotion'

// Components and Styles
import * as styles from '../../../styles/card/card'

const GeneralCard = (props) => {
  return (
    <div>
      <Link onClick={props.onClick} to={{ pathname: props.url }}>
        <Card className={css`${styles.card}` + ' p-4'} >
          <CardBody className='pl-0 pb-0'>
            {
                props.children
            }            
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default GeneralCard;
