
describe("database testing", () => {
    it("create Table 'users'", () => {
        cy.task(
            "QueryDB",
            `CREATE TABLE users(name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, age INT NOT NULL, PRIMARY KEY(name))`
        ).then((result) => {
            expect(result.message).to.equal("");
        })
    })
    it("insert users into 'users'", () => {
        cy.task(
            "QueryDB",
            `INSERT INTO users VALUES ("John Doue", "ejohn@emample.com", 24),("Carmela Frossa", "fosa@gmail.com", 21),("Ninna Gruava", "ninag@yahoo.com", 43);`
        ).then((result) => {
            expect(result.affectedRows).to.equal(3);
            expect(result.message).to.equal("&Records: 3  Duplicates: 0  Warnings: 0")
        })
    })
    it("select all from 'users'", () => {
        cy.task(
            "QueryDB",
            `SELECT * FROM users;`
        ).then((result) => {
            cy.log("Validation first row")
            .then(() => {
                expect(result[0].name).to.equal("Carmela Frossa");
                expect(result[0].email).to.equal("fosa@gmail.com");
                expect(result[0].age).to.equal(21); 
            })
            cy.log("Validation second row")
            .then(() => {
                expect(result[1].name).to.equal("John Doue");
                expect(result[1].email).to.equal("ejohn@emample.com");
                expect(result[1].age).to.equal(24); 
            }) 
        })
    })
    it("update John Doue's email", () => {
        cy.task(
            "QueryDB",
            `UPDATE users SET email = "ejohn@example.com" WHERE name = "John Doue"`
        ).then((result) => {
            expect(result.affectedRows).to.equal(1);
        })
    })
    it("select John Doue email ", () => {
        cy.task(
            "QueryDB",
            `SELECT email FROM users WHERE name = "John Doue";`
        ).then((result) => {
            expect(result[0].email).to.equal("ejohn@example.com")
        })
    })
    it("delete Ninna Gruava from 'users'", () => {
        cy.task(
            "QueryDB",
            `DELETE FROM users WHERE name ="Ninna Gruava"`
        ).then((result) =>{
            expect(result.affectedRows).to.equal(1)
        })
    })
    it("delete Table 'users'", () => {
        cy.task(
            "QueryDB",
            `DROP TABLE users`
        )
    })
})