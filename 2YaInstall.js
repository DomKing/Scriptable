// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: download;

const scripts = [
	{
		moduleName: "2YaInstall",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/2YaInstall.js",
	},
	{
		moduleName: "Install",
		url:
		 "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Install%20Scripts.js",
		// 感谢G大的 脚本库安装包 (https://github.com/GideonSenku)
	},
	{
		moduleName: "Calendar",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/Calendar.js",
	},
	{
		moduleName: "Birthday",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/Birthday.js",
	},
	{
		moduleName: "HistoryDay",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/HistoryToday.js",
	},
	{
		moduleName: "DmYY",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/DmYY.js",
	},
	{
		moduleName: "JDDou",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDou.js",
	},
	{
		moduleName: "JDDouK",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDDouK.js",
	},
	{
		moduleName: "JDWuLiu",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/JDWuLiu.js",
	},
	{
		moduleName: "BiliBili",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/BiliBili.js",
	},
	{
		moduleName: "BiliBiliWatch",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/BiliBiliWatch.js",
	},
	{
		moduleName: "ZXTrains",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/ZXTrains.js",
	},
	{
		moduleName: "Health",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/Health.js",
	},
	{
		moduleName: "Contact",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/Contact.js",
	},
	{
		moduleName: "Telegram",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/Telegram.js",
	},
	{
		moduleName: "ChinaTelecom",
		url:
		 "https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/ChinaTelecom.js",
	},
	{
		moduleName: "VPNBoard",
		url:
				"https://raw.githubusercontent.com/dompling/Scriptable/master/Scripts/VpnBoard.js",
	},
];

class YaYaInstall {
	constructor() {
		this.request = new Request("");
		this.files = FileManager.iCloud();
		this.rootPath = this.files.documentsDirectory();
		this.defaultHeaders = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};
	}

	saveFileName = (fileName) => {
		const hasSuffix = fileName.lastIndexOf(".") + 1;
		return !hasSuffix ? `${fileName}.js` : fileName;
	};

	write = (fileName, content) => {
		let file = this.saveFileName(fileName);
		const filePath = `${this.rootPath}/${file}`;
		FileManager.iCloud().writeString(filePath, content);
		return true;
	};

	fetchUrlString = async ({ url, headers = {} }, callback = () => {}) => {
		this.request.url = url;
		this.request.method = "GET";
		this.request.headers = {
			...headers,
			...this.defaultHeaders,
		};
		const data = await this.request.loadString();
		callback(this.request.response, data);
		return data;
	};

	saveFile = async ({ moduleName, url }) => {
		const header = `// Variables used by Scriptable.
  // These must be at the very top of the file. Do not edit.
  // icon-color: deep-gray; icon-glyph: file-code;\n`;
		const content = await this.fetchUrlString({ url });
		const fileHeader = content.includes("icon-color") ? `` : header;
		this.write(`${moduleName}`, `${fileHeader}${content}`);
	};

	install = async () => {
		console.log("🤖更新开始!");
		for (const script of scripts) {
			await this.saveFile(script);
			console.log(script.moduleName + "：更新成功");
		}
		console.log("🤖更新结束!");
	};
}

await new YaYaInstall().install();
