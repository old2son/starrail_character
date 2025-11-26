import pxToViewport from 'postcss-px-to-viewport-8-plugin'

export default {
    plugins: [
        pxToViewport({
            viewportWidth: 375,
        }),
    ],
}
