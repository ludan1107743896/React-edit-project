/**
 * 属性编辑区代码组件
 */
import React from "react";
import { Collapse, Button, Row, Col } from 'antd';

const Panel = Collapse.Panel;
class PropsComp extends React.Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        const selectItem = this.props.state.editCom; // 等价于 this.state.editCom
        const showCompFlag = selectItem.type;
        return (
            // <div style={{ width: "30vw", overflow: "auto", position: 'fixed', right: 0, top: 0, height: "100vh", border: '1px solid #000' }}>
            //     <h2 style={{ textAlign: 'center', padding: "10px" }}>组件属性展示编辑区域</h2>
                <Collapse defaultActiveKey={['0', 'output']} onChange={() => { }}>
                    <Panel 
                        header={`属性编辑区${selectItem.title||''}`} 
                        key={0}
                    >
                        <div style={{ minHeight: "30px", background: "#fff" }}>
                            <Row style={{textAlign: "center"}}>
                                {
                                    showCompFlag?
                                    <Col span={8} style={{border:0}}><Button type="primary" onClick={() => {
                                        // selectItem.hasDelete=true; this.props.forceUpdate();
                                    }}>删除此元素</Button></Col>:null
                                }
                                {
                                    showCompFlag?
                                    <Col span={8} style={{border:0}}><Button type="primary" onClick={() => {

                                    }}>复制此元素</Button></Col>:null
                                }
                                <Col span={8} style={{border:0}}><Button type="primary" onClick={() => {

                                }}>清空并重新开始</Button></Col>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
            // </div>
        )
    }
}

export default PropsComp;