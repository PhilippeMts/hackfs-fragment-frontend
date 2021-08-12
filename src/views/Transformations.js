/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react'

// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody, CardLink, CardText, CardTitle,
  Col,
  Row,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { transformationsStore } from '../utils/localStorage'

function Transformations () {

  const [keys, setKeys] = useState([])
  const [transformationsMap, setTransformationsMap] = useState({})
  const getTransformations = async () => {
    let _keys = []
    let _transformationsMap = {}
    await transformationsStore.iterate((v, k) => {
      _transformationsMap[k] = v
      _keys.push(k)
    })
    setTransformationsMap(_transformationsMap)
    setKeys(_keys)
  }

  useEffect(getTransformations, [])

  return (
    <>
      <div className="content">
        <Breadcrumb>
          <BreadcrumbItem active>Transformations</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardText>
                  Push on IPFS the Wasm bytecode of all transformations
                  you want to
                  use to process datasets.
                </CardText>
                <NavLink to="/transformations/new">
                  <Button color="primary" className={'text-center'}>Import
                    new transformation</Button>
                </NavLink>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {
            keys.map(k => transformationsMap[k]).
              map(({ name, desc }) => (
                <Col md="4" className="all-transformations-item">
                  <Card>
                    <CardBody>
                      <div>
                        <CardTitle>{name}</CardTitle>
                        <CardText>{desc}</CardText>
                      </div>
                      <NavLink to="/transformations/todo">
                        <CardLink>Card link</CardLink>
                      </NavLink>
                    </CardBody>
                  </Card>
                </Col>
              ))
          }
        </Row>
      </div>
    </>
  )
}

export default Transformations
