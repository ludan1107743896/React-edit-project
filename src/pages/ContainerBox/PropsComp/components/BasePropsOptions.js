import React from 'react';
import { Row, Col, Button } from 'antd';

class BasePropsOptions extends React.Component{
    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        const { showType } = this.props;
        return (
            <div>
                <Row>
                    {
                        showType ?
                        <Col span={16} style={{border:0}}>
                            <Button
                                onClick={() => {
                                    
                                }} 
                                style={{ marginRight: 50 }}
                                type="primary"
                            >删除此元素</Button>
                            <Button 
                                style={{ marginRight: 20 }}
                                type="primary"
                            >复制此元素</Button>
                        </Col>:null
                    }
                    <Col span={showType ? 8 : 24}  style={{border:0}}>
                        <Button
                            style={{ marginRight: 20 }}
                            type="primary"
                        >清空并重新开始</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BasePropsOptions;