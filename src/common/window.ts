export function getUrlSearchParams(): URLSearchParams {
    return new URLSearchParams(window.location.search)
}

export function setUrlSearchParams(params: URLSearchParams): void {
    const urlBeforeSearch = window.location.href.split('?')[0]
    const newUrl = urlBeforeSearch + '?' + params.toString()
    window.history.pushState(null, '', newUrl)
}

export function updateUrlSearchParams(callback: (params: URLSearchParams) => void): void {
    const params = getUrlSearchParams()
    callback(params)
    setUrlSearchParams(params)
}

export const QueryStringKey = {
    TAB: 'tab',
    QUESTION_TYPE_INDEX: 'index',
} as const
