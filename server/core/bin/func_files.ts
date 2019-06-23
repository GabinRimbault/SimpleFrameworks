/*
 * Function file
 * This function file contains all functions related to the folder and file
 */

const fs = require("fs");
const path = require("path");
var filePtr = {};
var fileBuffer = {};
var buffer = new Buffer(4096);

export function fopen(path: string, mode: string) {
	var handle = fs.openSync(path, mode);
	filePtr[handle] = 0;
	fileBuffer[handle] = [];
	return handle;
}

export function fclose(handle: any) {
	fs.closeSync(handle);
	if (handle in filePtr) {
		delete filePtr[handle];
		delete fileBuffer[handle];
	}
	return;
}

export function fgets(handle: any) {
	if (fileBuffer[handle].length == 0) {
		var pos = filePtr[handle];
		var br = fs.readSync(handle, buffer, 0, 4096, pos);
		if (br < 4096) {
			delete filePtr[handle];
			if (br == 0) return false;
		}
		var lst = buffer
			.slice(0, br)
			.toString()
			.split("\n");
		var minus = 0;
		if (lst.length > 1) {
			var x = lst.pop();
			minus = x.length;
		}
		fileBuffer[handle] = lst;
		filePtr[handle] = pos + br - minus;
	}
	return fileBuffer[handle].shift();
}

export function eof(handle: any) {
	return handle in filePtr == false && fileBuffer[handle].length == 0;
}

export function listDir(path: string) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, function(err: any, items: any) {
			resolve(items);
			reject(err);
		});
	});
}

export function getCurrentDirectoryBase() {
	return path.basename(process.cwd());
}

export function directoryExists(filePath: string) {
	try {
		fs.statSync(filePath);
		return true;
	} catch (err) {
		return false;
	}
}

export function fdel(path: string) {
	fs.unlinkSync(path);
	return true;
}
