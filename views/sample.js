const request = require("request");
const fs = require("fs");
const path = require('path')

const API_KEY = "YOUR_API_KEY";

(async function main() {
    const taskId = await createTask()
    const result = await polling(() => getTaskResult(taskId))
    console.log(`result: ${JSON.stringify(result, null, 2)}`)
})()


const polling = async (fn, delay = 1 * 1000, timeout = 30 * 1000) => {
    if (!fn) {
        throw new Error('fn is required')
    }
    try {
        const result = await fn()
        return result
    } catch (error) {
        if (error && 'data' in error) {
            throw new Error(JSON.stringify(error, null, 2))
        }
        if (timeout <= 0) {
            throw new Error('timeout')
        }
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
        return polling(fn, delay, timeout - delay)
    }
}

function createTask() {
    return new Promise((resolve, reject) => {
        request(
            {
                method: "POST",
                url: "https://techsz.aoscdn.com/api/tasks/visual/segmentation",
                headers: {
                    "X-API-KEY": API_KEY,
                },
                formData: {
                    image_file: fs.createReadStream(path.join(__dirname, './test.jpg')),
                },
                json: true
            },
            function (error, response) {
                if (response.body.data) {
                    resolve(response.body.data.task_id)
                } else {
                    reject(response.body)
                }
            }
        );
    })
}

function getTaskResult(taskId) {
    return new Promise((resolve, reject) => {
        request(
            {
                method: "GET",
                url: `https://techsz.aoscdn.com/api/tasks/visual/segmentation/${taskId}`,
                headers: {
                    "X-API-KEY": API_KEY,
                },
                json: true
            },
            function (error, response) {
                if (!response.body.data) reject(response.body)
                const { progress, state } = response.body.data
                if (state < 0) reject(response.body)
                if (progress >= 100) resolve(response.body)
                reject(null)
            }
        );
    })
}