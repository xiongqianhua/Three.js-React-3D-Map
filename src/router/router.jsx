/*
 * @Author: qianhua.xiong
 */
import React from 'react'
import { Routes, Route } from "react-router-dom";
import EarthMap from '../page/Map';
class RouterPage extends React.Component {
  constructor(props) {
		super(props)
        this.state = {}
  }
    render() {
        return (
            <Routes>
                <Route path='/' element={<EarthMap {...this.props} />} />
                <Route path='/mapLocationSelect' element={<EarthMap {...this.props} />} />
            </Routes>)
    }
}

export default RouterPage
