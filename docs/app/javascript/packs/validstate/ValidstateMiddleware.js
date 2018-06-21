const customMiddleWare = config => store => next => action => {
  console.log("Middleware triggered:", action, config.value);
  next(action);
}