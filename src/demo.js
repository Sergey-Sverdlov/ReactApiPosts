const createPromise = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("Done")
            res(200)
        }, 2000)
    })
}

const createPromise2 = (x) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("Done")
            res(200 + x)
        }, 2000)
    })
}

let usePromise = async () => {
    let x = await createPromise()
    let y = await createPromise2(x)
    console.log(y)
}

usePromise()