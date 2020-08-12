// 编辑组件提取
import React from "react";
import { Collapse, Button, Row, Col } from 'antd';
import './index.css';
import BasePropsOptions from './components/BasePropsOptions';

const Panel = Collapse.Panel;
class PropsComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { selectItem } = this.props;
        // const showCompFlag = selectItem.type;
        return (
            <div className="props-box">
                <h2 className="props-box-header">组件属性展示编辑区域</h2>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={`属性编辑区${selectItem.title||''}`}>
                        <BasePropsOptions 
                            showType={selectItem.type} 
                            {...this.props}
                        />
                    </Panel>
                </Collapse>


                {/* <Collapse defaultActiveKey={['0', 'output']} onChange={() => { }}>
                    <Panel header={'属性编辑区 ' + (this.state.editCom.title ? `（${this.state.editCom.title}）` : '')} key={0}>
                        <div style={{ minHeight: "30px", background: "#fff" }}>

                            {
                                this.state.editCom.type ? <Button onClick={() => {
                                    this.state.editCom.hasDelete = true;
                                    this.forceUpdate();
                                }} style={{ marginRight: 20 }}>删除此元素</Button> : null
                            }
                            {
                                this.state.editCom.type ? <Button onClick={() => {
                                    this.copyCom(this.state.editCom);
                                    this.forceUpdate();
                                }} style={{ marginRight: 20 }}>复制此元素</Button> : null
                            }
                            <Button onClick={() => {
                                localStorage.setItem('cache_data', '');
                                window.location.reload();
                            }} style={{ marginRight: 20 }}>清空并重新开始</Button>
                            {
                                (this.state.editCom && this.state.editCom.config) ? Object.keys(this.state.editCom.config).map((key) => {
                                    if (key == 'style') {
                                        var style = this.state.editCom.config.style;

                                        return Object.keys(this.state.editCom.config.style).map((s) => {
                                            if (style[s].type == 'color') { //背景属性处理
                                                return <Form.Item label={this.state.editCom.config[key][s].text} style={{ marginBottom: 5 }}>
                                                    <ColorPicker
                                                        color={this.state.editCom.props.style[s] || '#fff'}
                                                        onChange={(c) => {
                                                            this.state.editCom.props.style[s] = c.color;
                                                            this.forceUpdate();
                                                        }}
                                                        placement="topRight"
                                                    />
                                                </Form.Item>
                                            } else if (style[s].type == '4-value') { // margin 属性处理
                                                var defaultValue = this.state.editCom.props.style[s] || "0";
                                                if (defaultValue.toString().indexOf(' ') == -1) {
                                                    this.state.value4EditResult[s] = [defaultValue, defaultValue, defaultValue, defaultValue];
                                                } else {
                                                    this.state.value4EditResult[s] = defaultValue.split(' ')
                                                }
                                                return <Form.Item label={this.state.editCom.config.style[s].text} style={{ marginBottom: 5 }}>
                                                    上：<Input defaultValue={this.state.value4EditResult[s][0]} onChange={(v) => {
                                                        this.state.value4EditResult[s][0] = v.target.value;
                                                        this.state.editCom.props.style[s] = this.state.value4EditResult[s].join(" ")
                                                        this.forceUpdate()
                                                    }} style={{ width: 50, marginRight: 5 }}></Input>
                                  右：<Input defaultValue={this.state.value4EditResult[s][1]} onChange={(v) => {
                                                        this.state.value4EditResult[s][1] = v.target.value;
                                                        this.state.editCom.props.style[s] = this.state.value4EditResult[s].join(" ")
                                                        this.forceUpdate()
                                                    }} style={{ width: 50, marginRight: 5 }}></Input>
                                  下：<Input defaultValue={this.state.value4EditResult[s][2]} onChange={(v) => {
                                                        this.state.value4EditResult[s][2] = v.target.value;
                                                        this.state.editCom.props.style[s] = this.state.value4EditResult[s].join(" ")
                                                        this.forceUpdate()
                                                    }} style={{ width: 50, marginRight: 5 }}></Input>
                                  左：<Input defaultValue={this.state.value4EditResult[s][3]} onChange={(v) => {
                                                        this.state.value4EditResult[s][3] = v.target.value;
                                                        this.state.editCom.props.style[s] = this.state.value4EditResult[s].join(" ")
                                                        this.forceUpdate()
                                                    }} style={{ width: 50 }}></Input>
                                                </Form.Item>
                                            } else {
                                                return <Form.Item label={this.state.editCom.config[key][s].text} style={{ marginBottom: 5 }}>
                                                    <Input defaultValue={this.state.editCom.props[key][s]} onChange={(v) => {
                                                        this.state.editCom.props[key][s] = v.target.value;
                                                        this.forceUpdate()
                                                    }}></Input>
                                                </Form.Item>
                                            }
                                        })
                                    } else if (this.state.editCom.config[key].enumobject) { // 默认数据
                                        return this.renderEnumObject(this.state.editCom, key);
                                    } else { // 其他属性
                                        return <Form.Item label={this.state.editCom.config[key].text} style={{ marginBottom: 5 }}>
                                            {
                                                (() => {
                                                    if (this.state.editCom.config[key].enum) { // 枚举类型
                                                        return <Select
                                                            defaultValue={this.state.editCom.props[key].toString()}
                                                            style={{ width: 120 }}
                                                            onChange={(v) => {
                                                                this.state.editCom.props[key] = (v == "true" ? true : (v === "false" ? false : v));
                                                                this.forceUpdate();
                                                            }}>
                                                            {
                                                                this.state.editCom.config[key].enum.map((n) => {
                                                                    return <Select.Option value={`${n}`}>{n}</Select.Option>
                                                                })
                                                            }
                                                        </Select>
                                                    } else if (this.state.editCom.config[key].type == "Boolean") { // boolean 类型
                                                        return <Checkbox
                                                            checked={this.state.editCom.props[key]}
                                                            onChange={(v) => {
                                                                this.state.editCom.props[key] = v.target.checked;
                                                                this.forceUpdate();
                                                            }} />

                                                    } else if (key == 'content') { // 文本内容
                                                        return <Input defaultValue={this.state.editCom.props[key]} onChange={(v) => {
                                                            this.state.editCom.props[key] = v.target.value;
                                                            this.forceUpdate()
                                                        }}></Input>
                                                    } else {
                                                        return <Input defaultValue={this.state.editCom.props[key]} onChange={(v) => {
                                                            this.state.editCom.props[key] = v.target.value;
                                                            this.forceUpdate()
                                                        }}></Input>
                                                    }
                                                })()
                                            }
                                        </Form.Item>
                                    }
                                }) : (
                                        <Alert message="此组件无可编辑属性" type="warning" style={{ marginTop: 20 }}></Alert>
                                    )
                            }
                        </div>
                    </Panel>
                </Collapse> */}
            </div>
        )
    }
}

export default PropsComp;