export const routes = {
    root: () => `/`,
    page: (id?: string) => `/page/${id || ':id'}`,
    editPage: (id?: string) => `/page/edit/${id || ':id'}`,

}
