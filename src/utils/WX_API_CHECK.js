export function checkApi (api, sdk, callback) {
  if (sdk) {
    sdk.checkJsApi({
      jsApiList: [api],
        success: res => {
					if (res.checkResult[api]) {

						sdk[api](callback);

					} else {
						console.error(api, '微信JS-SDK不支持该功能');
					}
        }
    })
  } else {
		console.error(api, '微信JS-SDK注册失败,无法使用');
  }
}
