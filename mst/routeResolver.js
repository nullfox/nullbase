import _ from 'lodash';

export default class RouteResolver {
  static factory(store, routes = []) {
    return new RouteResolver(store, routes);
  }

  constructor(store, routes = []) {
    this.store = store;
    this.routes = routes;
  }

  resolve() {
    const route = _.find(this.routes, resolver => resolver(this.store) !== false);
  
    const resolved = route(this.store);
  
    console.log(`[RouteResolver] Navigating to route: ${resolved}`);
  
    return this.store.navigate(resolved);
  }
}
