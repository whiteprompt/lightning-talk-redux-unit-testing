import reducer, {
    BannerType,
    initialState,
    onUserAuthenticated,
    onUserAuthenticationError,
    BannerMessages,
} from './slice'

describe('Banner actions', () => {
    describe('initial state', () => {
        it('should default to initial state', () => {
            expect(reducer(undefined, { type: 'UNKNOWN' })).toBe(initialState)
        })
    })

    it('should set a success message when the user is authenticated', () => {
        const state = reducer(initialState, onUserAuthenticated())

        expect(state).toHaveProperty('message', BannerMessages.onUserAuthenticated)
        expect(state).toHaveProperty('type', BannerType.SUCCESS)
    })

    it('should set an error message when the user is not authenticated', () => {
        const state = reducer(initialState, onUserAuthenticationError())

        expect(state).toHaveProperty('message', BannerMessages.onUserAuthenticationError)
        expect(state).toHaveProperty('type', BannerType.ERROR)
    })
})
