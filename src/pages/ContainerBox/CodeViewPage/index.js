import React from 'react';
import _ from 'lodash';
import { Radio, Input } from 'antd';

class CodeViewPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            radioKey: '2'
        }
    }

    renderJSONtoJSX = () => {
        this.props.state.indent_space = ''
        return  `
        import React, { Component } from 'react';
        // 这里声明要引入的组件
        import { ${_.uniq(this.props.state.dependComponents).join(', ')} } from '../components/index.jsx';
        // Index 一般是当前页面名称 index.html
        class Index extends Component {
            constructor () {
                super();
            }
            render(){
                return ${this.renderElementtoJSX(this.props.state.data).replace(/\n/,'')}
            }
        }
        export default Index;`
    }

    renderElementtoJSX = (data) => {
        var result = '';
        this.props.state.indent_space += "    ";
        data.forEach((d) => {
            if (d.hasDelete) return;
            result += `
          ${this.props.state.indent_space}<${d.type}${this.renderProps(d.props, d)}>${d.props.content ? [d.props.content] : (d.childrens ? this.renderElementtoJSX(d.childrens) : '')}</${d.type}>
          `
        })
        this.props.state.indent_space = this.props.state.indent_space.replace('    ', '');
        result += `${this.props.state.indent_space}`;
        return result;
    }

    renderProps = (props, d) => {
        var result = '';
        var props = _.cloneDeep(props);
        for (var i in props) {
            if (!(/^on[A-Z]/.test(i) || /draggable/.test(i) || /content/.test(i))) {
                if (/^event_(.*?)/.test(i)) {
                    result += ` ${i.replace('event_', '')}={()=>{ }}`
                } else if (typeof (props[i]) == 'object' && props[i].type == 'relative') {
                    result += ` ${i}={${JSON.stringify(props[props[i].target] ? props[i].true : props[i].false)}}`
                } else if (d.sub_type == "table_container" && i == 'columns') {
                    var renderCache = {}
                    props[i].forEach((p, pi) => {
                        if (p.childrens) {
                            var indentCache = this.props.state.indent_space;
                            this.props.state.indent_space = '';
                            renderCache['$$' + pi + '$$'] = `()=>{ return ${this.renderElementtoJSX(p.childrens).replace(/\n    /, '')}}`
                            this.state.indent_space = indentCache
                            p.render = '$$' + pi + '$$'
                            delete p.childrens;
                        }
                    })
                    var noindent = JSON.stringify(props[i])
                    var indent = JSON.stringify(props[i], null, 2);
                    var r = noindent.length > 100 ? indent : noindent;
                    for (var m in renderCache) {
                        r = r.replace(`"${m}"`, renderCache[m])
                    }
                    result += ` ${i}={${r}}`
                } else {
                    var noindent = JSON.stringify(props[i])
                    var indent = JSON.stringify(props[i], null, 2);
                    result += ` ${i}={${noindent.length > 100 ? indent : noindent}}`
                }
            }
        }
        return result;
    }

    render() {
        return (
            <div style={{position:'relative', width: "75vw", height: "100vh", border: "1px solid #000", overflow:'hidden'}}>
                <h2 style={{textAlign: 'center', padding: "10px"}}>组件代码展示区</h2>
                <pre style={{height: '90vh', overflow: 'auto'}}>
                    {this.props.viewText}
                    {/* {this.renderJSONtoJSX()} */}
                </pre>
                <div style={{ position: 'absolute', bottom: '0' }}>
                    <Radio.Group onChange={(e) => {
                        console.log(e,'e')
                        this.props.restPage({radioKey: e.target.value})
                        this.setState({radioKey: e.target.value})
                    }} value={this.state.radioKey}>
                        <Radio.Button value="1">视图标签</Radio.Button>
                        <Radio.Button value="2">代码标签</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

export default CodeViewPage;
