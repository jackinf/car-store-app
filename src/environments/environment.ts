// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const crudCrudId = "9f322e94f6c24902894e8f0dc1a07b67";

export const environment = {
  production: false,
  seed: false,
  allCarsApi: `https://crudcrud.com/api/${crudCrudId}/all-cars/`,
  buyersApi: `https://crudcrud.com/api/${crudCrudId}/buyers/`,
  buyerCarsApi: `https://crudcrud.com/api/${crudCrudId}/buyer-cars/`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
