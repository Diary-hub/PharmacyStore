export var paginationItems = [];
var paginationItems2 = [];
var ok = false;

export const itemss = (data) => {
  if (!ok) {
    data.data.forEach((element) => {
      paginationItems.push(element);
    });
    ok = true;
  }
};
