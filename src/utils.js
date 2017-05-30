export const bind = context => name => context[name] = context[name].bind(context);
export const normalize = name => array => array.reduce((acc, obj) => ({ ...acc, [obj[name]]: obj }), {});
