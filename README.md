# Angular CRUD Data Table

![](https://github.com/JWoltjen/Angular-Material-Data-Table/blob/master/Recording%202022-10-06%20at%2014.10.16%20(1).gif)

This is a simple tutorial that explores the making basic CRUD calls to a mocked json-server as well as implementing the fundamentals of the Material component library, specifically data-tables and dialogs. 

The project also follows best practices by segregating services from UI components so there is a separation of concerns and observance of the single-responsibility principle. 

## Data Table

The data table is handled at the app.component level. It has features for filters, sorting, and pagination. The data table is created using member variables for columns and datasource within the app.component. The datasource is of type MatTablDataSource which is an imported component from Angular. The paginator and sorting functionality is achieved by using the @ViewChild injectable for MatPaginator and MatSort. 

In the html structure of the application, the datasource is passed to the mat-table with the [datasource]="datasource" input directive. Next, each column is contained in an ng-container element with a matColumnDef which defines the data within dataSource that comprises the row object, e.g, "productName", or "category". Contained in each ng-container is a mat-header cell and a mat-cell. Inside the mat-cell, the relevant data from the row object is populated via interpolation, e.g., "row.productName", or "row.category". 

## Dialog   
The dialog makes use of Angular's DialogComponent. On click, a dialog is opened which displays a form to the user. Observing separation of concerns, while the openDialog function is at the app.component level, the DialogComponent itself is its own component. The component makes use of the Form Group, FormBuilder and Validators from Angular Forms. OnInit, a member variable productForm is created from FormGroup and consists of a formBuilder.group of several items, productName, category, freshness, price, comment, and date. These items will also constitute the data that will eventually be displayed on the data table itself. 

### DialogRef
To manipulate the component itself, we use the Angular MatDialogRef component, which allows us to perform actions such as closing the component. 


### Adding Products
To add a new product within the dialog form, we use the formBuilder within the ngOnInit lifecycle hook to set the default values of each field in the form and also to declare if they are required. We can then call the ApiService which we passed through in the constructor to call the postProduct method from our services layer, passing through the form values the user has entered. We subscribe to this api call, on next, we reset the form and close the dialog. On error, we alert the user of the error. 


### Editing Products
The dialog can also be edited. If the user clicks the edit button, the editProduct functioni s called, passing in a row as a parameter. The editProduct function opens a dialog and passes the row object as the data. Then, in the dialogComponent, we make use of the MAT_DIALOG_DATA as an injectable within the constructor of the dialogComponent, and we call this edit data. This is how the component knows it's being updated versus simply filling in data. 

If editData exists, we use the productForm.controls prototype method and set the value of each category to the data currently set by the user in the input field. 


## Services  

Because we follow separation of concerns, we have all of our get/put/post/delete calls to the mocked backend in one separate file, away from the components that use them. We call this file api.services. 

The ApiService uses the HttpClient module from Angular, the rest of the crud functions are dead simple to implement. Subscribing to them is still fuzzy when the services get called by other components though, but it's simply a matter of using the angular syntax of subscribing to a service, and then using next and error etc. 


