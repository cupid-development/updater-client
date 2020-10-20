export default class MediaQueryUtils {
    static MOBILE_MEDIA_QUERY = '(max-width: 1024px)';
    static MOBILE_TYPE = 'mobile';

    static DESKTOP_TYPE = 'desktop';

    static MEDIA_QUERY_LIST = [
        [MediaQueryUtils.MOBILE_TYPE, MediaQueryUtils.MOBILE_MEDIA_QUERY],
        [MediaQueryUtils.DESKTOP_TYPE, null],
    ];

    static matchMediaQuery(query) {
        return matchMedia(query);
    }

    static isMediaQueryActive(query) {
        const matcher = this.matchMediaQuery(query);
        return matcher.matches;
    }

    static matchMediaAddListener(query, cb) {
        const matcher = this.matchMediaQuery(query);
        matcher.addEventListener('change', cb);
    }

    static getDeviceType() {
        for (const typeQuery of this.MEDIA_QUERY_LIST) {
            const [type, query] = typeQuery;
            if (!query || this.isMediaQueryActive(query)) {
                return type;
            }
        }
    }

    static currentDeviceType = null;
    static onDeviceTypeChange(cb) {
        for (const typeQuery of this.MEDIA_QUERY_LIST) {
            const [, query] = typeQuery;

            if (!query) {
                continue;
            }

            this.matchMediaAddListener(query, () => {
                const newDeviceType = this.getDeviceType();
                if (this.currentDeviceType !== newDeviceType) {
                    this.currentDeviceType = newDeviceType;
                    cb(this.currentDeviceType);
                }
            });
        }
    }
}
