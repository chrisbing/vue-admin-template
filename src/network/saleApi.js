/**
 *
 */

export const config = {
    baseURL: '//jsonplaceholder.typicode.com',
    timeout: 5000,
    withCredentials: false
}

export function useInterceptors(netApi) {
    netApi.interceptors.request.use(function (request) {
        return new Promise(resolve => {
            resolve(request)
        })
    })

    netApi.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            let response = error.response
            if (response) {
                if (response.status >= 500) {
                    if (response.data && response.data.message) {
                        alert(response.data.message)
                    } else {
                        alert('系统出了一点小问题/_\\')
                    }
                    return Promise.reject(error)
                }
                let errors = ''
                for (let message in response.data.messages) {
                    if (response.data.messages.hasOwnProperty(message)) {
                        errors += message + ':' + response.data.messages[message].join('|') + "\n"
                    }
                }
                errors = (errors || response.data.message)
                errors && alert(errors)
                return Promise.reject(error)
            }
            return Promise.reject(error)
        })
}