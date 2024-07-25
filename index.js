const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const mysql = require('mysql2/promise');

// URL of the webpage to crawl
const url = 'https://www.afdj.ro/ro/cotele-dunarii';

// MySQL connection details
const dbConfig = {
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'danube_levels',
};


function testCron() {
    const today = new Date();
    console.log("bau: ", today);
}

// Function to fetch and parse the webpage
async function fetchAndParse() {
    try {
        // Fetch the HTML of the webpage
        const { data } = await axios.get(url);

        // Load HTML into Cheerio
        const $ = cheerio.load(data);

        // Initialize an empty array to store tables
        const tables = [];

        // Iterate over each table element
        $('table').each((index, element) => {
            // Initialize an empty object to store table data
            const tableData = {};

            // Get table column headers
            const headers = [];
            $(element).find('thead th').each((i, el) => {
                headers.push($(el).text().trim());
            });

            // Get table rows
            const rows = [];
            $(element).find('tbody tr').each((i, el) => {
                const row = {};
                $(el).find('td').each((j, td) => {
                    row[headers[j]] = $(td).text().trim();
                });
                rows.push(row);
            });

            // Add table data to tables array
            tableData.headers = headers;
            tableData.rows = rows;
            tables.push(tableData);
        });

        //console.log(tables);

        // Store tables in MySQL database
        // const connection = await mysql.createConnection(dbConfig);
        // for (const table of tables) {
        //     for (const row of table.rows) {
        //         const columns = Object.keys(row).join(', ');
        //         const values = Object.values(row).map(value => `'${value}'`).join(', ');
        //         const query = `INSERT INTO water_levels (${columns}) VALUES (${values})`;
        //         await connection.execute(query);
        //     }
        // }
        //await connection.end();
        
        

        console.log(`Tables parsed and saved to MySQL database`);
    } catch (error) {
        console.error('Error fetching or parsing the webpage:', error);
    }
}

// Schedule the script to run daily at midnight
// cron.schedule('0 0 * * *', fetchAndParse);
// cron.schedule("0/20 * * * * *", testCron);
// Schedule tasks to be run on the server.
// cron.schedule('*/10 * * * * *', function() {
//     console.log('running a task every minute');
//   });


  cron.schedule("0 0 */1 * * *", testCron);



// Run the script once when the application starts
fetchAndParse();
