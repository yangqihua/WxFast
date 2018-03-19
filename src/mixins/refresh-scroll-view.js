import wepy from 'wepy'

export default class testMixin extends wepy.mixin {

    onReachBottom() {
        this.$invoke('refresh-scroll-view', 'loadMore')
    }
    onPageScroll(e) {
        this.$invoke('refresh-scroll-view', 'onPageScroll',e)
    }

    onPullDownRefresh() {
        this.$invoke('refresh-scroll-view', 'refresh')
    }

}
