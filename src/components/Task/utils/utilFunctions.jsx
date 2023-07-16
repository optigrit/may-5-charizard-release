const UtilFunctions = {
  getSubtaskProgress: (id, taskProgress) => {
    const item = taskProgress?.subTaskprogress?.find(
      (item) => item.subTaskId === id
    );
    return item?.progress;
  },

  getFileUrl: (id, taskProgress) => {
    const item = taskProgress?.subTaskprogress?.find(
      (item) => item.subTaskId === id
    );
    return item?.progress?.submission?.fileUrl;
  },

  formatBytes: (bytes) => {
    const decimal = 2;
    const num = 1024;
    const kiloBytes = num; // One Kilobyte is 1024 bytes
    const megaBytes = num * num; // One MB is 1024 KB
    const gigaBytes = num * num * num; // One GB is 1024 MB

    if (bytes < kiloBytes) return bytes + " B";
    else if (bytes < megaBytes)
      return (bytes / kiloBytes).toFixed(decimal) + " KB";
    else if (bytes < gigaBytes)
      return (bytes / megaBytes).toFixed(decimal) + " MB";
    else return (bytes / gigaBytes).toFixed(decimal) + " GB";
  },

  getSubtaskPostItem: (subtaskPostData, subtaskId) => {
    const item = subtaskPostData?.find((el) => el.subtaskId === subtaskId);
    return item;
  },

// For getting readable date from epoch value
  parseEpochDate: (value) => {
    const date = new Date(value * 1000);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getUTCDate().toString();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString();

    const parsedDate = day + " " + month + " " + year;

    return parsedDate;
  },

  // For getting readable time from epoch value 
  parseEpochTime: (value) => {
    const date = new Date(value * 1000);
    const parsedTime = date.getHours() + ":" + date.getMinutes();

    return parsedTime;
  },

  convertDuration : (value) => {
    if (value >= 86400) {
      return value / 86400;
    } else if (value < 86400) {
      return value / 3600;
    }
  }

};

export default UtilFunctions;
