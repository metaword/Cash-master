let MobileConfigContent = (function () {
        let _instance;

        function MobileConfigContent() {
            if (_instance)
                throw new Error("please use MobileConfigContent.instance");
            _instance = this;
        }

        function getCookie(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) {
                return decodeURIComponent(arr[2]);
            }
            return null;
        }

        function setCookie(options) {
            var _default = {
                name: null,
                value: null,
                expires: new Date(new Date().getTime() + (365 * 1000 * 60 * 60 * 24)),
                path: '/',
                // domain: ''
            };
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    _default[key] = options[key];
                }
            }
            document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toGMTString() + ";path=" + _default.path;
            // document.cookie = _default.name + "=" + escape(_default.value) + ";expires=" + _default.expires.toUTCString() + ";path=" + _default.path;
        }

        function getUdid(isRandom = false) {
            var udid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, item => {
                    var r = Math.random() * 0x10 | 0;
                    var v = item === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(0x10);
                }
            )
            if (isRandom)
                return udid;
            if (getCookie("_udid")) {
                return getCookie("_udid")
            } else {
                udid = `${udid}-${Date.now().toString(16)}`;
                setCookie({
                    name: "_udid",
                    value: udid
                })
                return udid
            }
        }

        let m_defaultMobileConfig = null;

        function downMobileConfigContent(channelId, channelName, h5) {
            m_defaultMobileConfig = `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
        <dict>
            <key>ConsentText</key>
            <dict>
                <key>default</key>
                <string>QWET1</string>
            </dict>
            <key>PayloadContent</key>
            <array>
                <dict>
                    <key>FullScreen</key>
                    <true/>       
                    <key>Icon</key>
                    <data>QWET2</data>
                    <key>IgnoreManifestScope</key>
                    <false/>
                    <key>IsRemovable</key>
                    <false/>
                    <key>Label</key>
                    <string>QWET3</string>
                    <key>PayloadDescription</key>
                    <string>配置 Web Clip 设置</string>
                    <key>PayloadDisplayName</key>
                    <string>Web Clip</string>
                    <key>PayloadIdentifier</key>
                    <string>com.apple.webClip.managed.9c5a52dd-0dfb-5d1e-6d79-8c12224935e5</string>
                    <key>PayloadType</key>
                    <string>com.apple.webClip.managed</string>
                    <key>PayloadUUID</key>
                    <string>9c5a52dd-0dfb-5d1e-6d79-8c12224935e5</string>
                    <key>PayloadVersion</key>
                    <integer>QWET7</integer>
                    <key>Precomposed</key>
                    <false/>
                    <key>URL</key>
                    <string>QWET8</string>
                </dict>
            </array>
            <key>PayloadDescription</key>
            <string>QWET9</string>
            <key>PayloadDisplayName</key>
            <string>QWET10</string>
            <key>PayloadIdentifier</key>
            <string>QWET11</string>
            <key>PayloadOrganization</key>
            <string>games</string>
            <key>PayloadRemovalDisallowed</key>
            <false/>
            <key>PayloadType</key>
            <string>Configuration</string>
            <key>PayloadUUID</key>
            <string>b9cf33ea-6ae5-41c1-a36b-e5cb04b50f8110032</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
        </plist>`;
            onDownloadButtonClick(channelId, channelName, h5);
        }

        async function onDownloadButtonClick(channelId, channelName, h5) {
            //let PayloadUUID1 = getUdid(true) + channelId;
            let PayloadIdentifier1 = "com.webclip.game." + channelId;

            let IconBase64 = "";
            let ldy = "mastercash777.com";
            try {
                if (window.location && window.location.hostname) {
                    ldy = window.location.hostname;
                }
            } catch (e) {}

            try {
                console.log("iOS H5 URL:", h5);
                const iconUrl = "static/web/logo.webp";
                IconBase64 = await getIconBase64(iconUrl);
                if (IconBase64 && IconBase64.indexOf(',') > -1) {
                    IconBase64 = IconBase64.split(',')[1];
                }
            } catch (error) {
                console.warn("Could not fetch icon via HTTP/fetch, continuing profile generation:", error);
                IconBase64 = "";
            }

            let cName = (channelName || "Cash Master777").trim();
            let h5url = h5;

            let installGuideText = "Click the 'Install' button in the top right corner. If prompted, enter your lock screen password to continue the installation. The first use may take some time to load, please be patient. The Apple Lite Version will never lose its signature. It simply adds a platform shortcut to your phone's home screen. This installation certificate is officially certified by Apple. It is safe and reliable and will not modify any phone settings, so feel free to install and use it. " + cName + " Permanent Address: " + ldy;

            let changes = {
                "QWET1": installGuideText,
                "QWET2": IconBase64,
                "QWET3": cName,
                "QWET7": "1",
                "QWET8": h5url,
                "QWET9": installGuideText,
                "QWET10": cName,
                "QWET11": PayloadIdentifier1,
            };

            let modifiedConfig = modifyMobileConfig(m_defaultMobileConfig, changes);

            // If icon is missing/empty, remove the empty Icon tag so iOS plist parser doesn't reject it
            if (!IconBase64) {
                modifiedConfig = modifiedConfig.replace(/<key>Icon<\/key>\s*<data><\/data>/g, "");
            }

            const blob = new Blob([modifiedConfig], {
                type: 'application/x-apple-aspen-config'
            });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'mastercash.mobileconfig';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Delay revoke so iOS Safari has ample time to stream the configuration profile
            setTimeout(function () {
                try {
                    URL.revokeObjectURL(url);
                } catch (e) {}
            }, 15000);
        }

        function modifyMobileConfig(config, changes) {
            let modifiedConfig = config;

            for (const key in changes) {
                modifiedConfig = modifiedConfig.replace(new RegExp(key, 'g'), changes[key]);
            }

            return modifiedConfig;
        }

        async function getIconBase64(iconUrl) {
            return new Promise((resolve, reject) => {
                fetch(iconUrl)
                    .then(response => {
                        if (!response.ok)
                            throw new Error('Network response was not ok: ' + response.statusText);
                        return response.blob();
                    })
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => {
                        reject('Error fetching the icon: ' + error);
                    });
            });
        }

        return {
            getCookie,
            setCookie,
            getUdid,
            downMobileConfigContent,
            onDownloadButtonClick,
            modifyMobileConfig,
            getIconBase64
        };
    }
)();

window.MobileConfigContent = MobileConfigContent;
