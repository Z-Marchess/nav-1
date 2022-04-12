const $lastLi = $('.last')
const $input = $('.searchForm input')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}
const render = () => {
    $('.siteList').find('li:not(.last)').remove() // 除了最后一个全部删除
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>`).insertBefore($lastLi)
        $li.on('click', '.close', (e) => {
            e.preventDefault()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$lastLi.on('click', () => {
    let url = window.prompt('添加网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url })
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    if (e.target === $input[0]) {
        e.preventDefault()
        console.log(e.target);
    }
    const key = e.key
    hashMap.forEach((node) => {
        if (node.logo.toLowerCase() === key || node.logo === key) {
            console.log(key);
            window.open(node.url, '_self')
        }
    });
})