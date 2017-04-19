var employees = [
    {id: 1, name: 'Vivek', profile: 'Programmer from distant galaxy', age: 28},
    {id: 2, name: 'Prashant', profile: 'Programmer and a time traveller', age: 28},
    {id: 3, name: 'Saurabh', profile: 'UI Designer', age: 26}
];

function findEmployee (employeeId) {
    return employees[findEmployeeKey(employeeId)];
};

function findEmployeeKey (employeeId) {
    for (var key = 0; key < employees.length; key++) {
        if (employees[key].id == employeeId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#employee-list',
    data: function () {
        return {employees: employees, searchKey: ''};
    },
    computed : {
        filteredEmployees: function () {
            var self = this;
            console.log("called..")
            return self.employees.filter(function (employee) {
                return employee.name.indexOf(self.searchKey) !== -1
            })
        }
    }
});

var Employee = Vue.extend({
    template: '#employee',
    data: function () {
        return {employee: findEmployee(this.$route.params.employee_id)};
    }
});

var EmployeeEdit = Vue.extend({
    template: '#employee-edit',
    data: function () {
        return {employee: findEmployee(this.$route.params.employee_id)};
    },
    methods: {
        updateEmployee: function () {
            var employee = this.employee;
            employees[findEmployeeKey(employee.id)] = {
                id: employee.id,
                name: employee.name,
                profile: employee.profile,
                age: employee.age
            };
            router.push('/');
        }
    }
});

var EmployeeDelete = Vue.extend({
    template: '#employee-delete',
    data: function () {
        return {employee: findEmployee(this.$route.params.employee_id)};
    },
    methods: {
        deleteEmployee: function () {
            employees.splice(findEmployeeKey(this.$route.params.employee_id), 1);
            router.push('/');
        }
    }
});

var AddEmployee = Vue.extend({
    template: '#add-employee',
    data: function () {
        return {employee: {name: '', profile: '', age: ''}
        }
    },
    methods: {
        createEmployee: function() {
            var employee = this.employee;
            employees.push({
                id: Math.random().toString().split('.')[1],
                name: employee.name,
                profile: employee.profile,
                age: employee.age
            });
            router.push('/');
        }
    }
});

var router = new VueRouter({
    routes: [{path: '/', component: List},
        {path: '/employee/:employee_id', component: Employee, name: 'employee'},
        {path: '/add-employee', component: AddEmployee},
        {path: '/employee/:employee_id/edit', component: EmployeeEdit, name: 'employee-edit'},
        {path:   '/employee/:employee_id/delete', component: EmployeeDelete, name: 'employee-delete'}
    ]});

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
});
