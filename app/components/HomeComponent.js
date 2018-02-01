import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


const HomeComponent = () => (
  <div className="LandingPage">
    <Card style={{width:"40vw", margin:"0 30vw 0 30vw"}}>
      <CardHeader
        title="This is a React App"
        subtitle="And some Material UI"
      />
    </Card>
  </div>
)

export default HomeComponent;
