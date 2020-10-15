import reducer, { initialState, clearUser, userReceived } from './slice'

describe('User actions', () => {
    describe('initial state', () => {
        it('should default to the initial state', () => {
            expect(reducer(undefined, { type: 'UNKNOWN' })).toBe(initialState)
        })
    })

    describe('on user received', () => {
        const newUser = {
            id: '1234',
            name: 'test',
            surname: 'fake surname',
            age: 10,
        }

        const state = reducer(initialState, userReceived(newUser))

        expect(state).toHaveProperty('profile', newUser)
    })

    describe('on user logout', () => {
        const state = reducer(initialState, clearUser())

        expect(state).toHaveProperty('profile', null)
    })
})
