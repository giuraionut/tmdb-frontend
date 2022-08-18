export interface User {
    id: number,
    username: string,
    name: string,
    avatar: {
        gravatar: { hash: string },
        tmdb: string
    }
}