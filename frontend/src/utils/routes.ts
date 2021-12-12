export const routes = {
    root: () => `/`,
    page: (slug?: string) => `/page/${slug || ':slug'}`,
    editPage: (id?: string) => `/page/${id || ':id'}/edit`,

}
