/**
 *编译CSS
 */

import Loader from './loader';
const publicPath = process.env.BASE_URL
const loader = new Loader()


async function createScript(source) {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = source
    head.appendChild(script)
    return new Promise((resolve, rejcet) => {
        script.onload = () => {
            resolve()
        }
    })
}
/**
 * 
 * @param {String} code 需要编译的sass字符串
 */
async function compileSass(code) {
    //scss&sacc
    let sass;
    if (!loader.get('sass')) {
        sass = require("../../public/static/sass");
        sass.setWorkerUrl(`${publicPath}static/sass.worker.js`);
        console.log("sassModule:",sass);
        loader.set('sass', sass)
    } else {
        sass = loader.get('sass')
    }
    return new Promise((resolve, reject) => {
        new sass().compile(code, result => {
            console.log("result:", result);
            if (result.status === 0) resolve(result.text)
            else resolve(code)
        })
    })

}
async function compileLess(code) {
    console.log("compileLess");
    let less
    if (!loader.get('less')) {
        less = await import('less')
        console.log("lessModule:",less);
        console.log("less:", less);
        loader.set('less', less)
    } else {
        less = loader.get('less')
    }
    return less.render(code)
}

async function compileStylus(code) {
    console.log("stylusCss:",code);

    // var stylus = require('stylus');

    // stylus.render(str, { filename: 'nesting.css' }, function(err, css){
    //     if (err) throw err;
    //     console.log("css11:",css);
    //     return css
    // });
    // let stylus
    // if (!loader.get('stylus')) {
    //     stylus = await import('stylus')
    //     console.log("stylusModule:", stylus);
    //     loader.set('stylus', stylus)
    // } else {
    //     console.log("stylus:", stylus);
    //     stylus = loader.get('stylus')
    // }
    // return stylus.render(code)
    if (!loader.get('stylus')) {
        // 把stylus.js插入到head标签中
        const source = `${publicPath}static/stylus.js`
        await createScript(source).then(() => {
            loader.set('stylus', true)
        })
    }
    return new Promise((resolve, rejcet) => {
        console.log("stylusModule:", stylus);
        stylus.render(code, { filename: 'sty.styl' }, (err, css) => {
            if (err) return rejcet(err)
            console.log("css:",css);
            resolve(css)
        })
    })
}

async function compileCSS(code, type) {
    switch (type) {
        case 'sass':
        case 'Sass':
        case 'Scss':
        case 'scss':
            await compileSass(code).then(res => {
                code = res
            }).catch(err => {
                console.log(err)
            })
            break
        case 'less':
        case 'Less':
            await compileLess(code).then(res => {
                code = res.css
            }).catch(err => {
                console.log(err);
            })
            break
        case 'stylus':
            await compileStylus(code).then(res=>{
                code = res
            }).catch(err=>{
                console.log(err);
            })
            break


    }
    return code
}

export {
    compileCSS
}