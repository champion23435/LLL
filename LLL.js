class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    get countedSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary = this.baseSalary + 200;
        }
        return salary;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getSalary() {
        return this.countedSalary;
    }
}

class Developer extends Employee {}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    getSalary() {
        return this.countedSalary * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    getSalary() {
        let salary = this.countedSalary;
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }
        const developerCount = this.team.filter(member => member instanceof Developer).length;
        if (developerCount > this.team.length / 2) {
            salary *= 1.1;
        }
        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const employees = [];
        this.managers.forEach(manager => {
            employees.push(manager);
            employees.push(...manager.team);
        });

        const salaryInfo = employees.map(employee => {
            return `${employee.fullName} отримав ${employee.getSalary().toFixed(2)} шекелів`;
        }).join('<br>');

        document.getElementById('salary-info').innerHTML = salaryInfo;
    }
}

// Приклад використання:
const dev1 = new Developer('Ivan', 'Ivanov', 1000, 3);
const dev2 = new Developer('Petro', 'Petrov', 1200, 6);
const des1 = new Designer('Anna', 'Ananova', 1100, 4, 0.9);
const man1 = new Manager('Oleg', 'Olegov', 2000, 10, [dev1, dev2, des1]);

const department = new Department([man1]);

document.getElementById('show-salaries').addEventListener('click', () => {
    department.giveSalary();
});
