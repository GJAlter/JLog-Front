export const getFileName = (fileName: string): string => {
    return fileName.substring(fileName.indexOf("_")+1);
}