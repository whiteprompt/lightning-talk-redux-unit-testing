import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { appInitialState } from '../../store'
import { authenticate } from './thunks'
import { PayloadAction } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'
import { userReceived } from './slice'
import { onUserAuthenticated, onUserAuthenticationError } from '../banner/slice'

jest.mock('api')

const api = require('api')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('User thunks', () => {
    describe('Wheh calling authenticate and the user is retrieved', () => {
        let actions: PayloadAction<any>[]
        const newUser = {
            id: '1234',
            name: 'test',
            surname: 'fake surname',
            age: 10,
        }
        beforeEach(async () => {
            api.login.mockReturnValueOnce({
                data: newUser,
            })

            const store = mockStore(appInitialState)

            await store.dispatch(authenticate({ email: 'test@authenticate.com', password: '1234' }))

            actions = store.getActions()
        })

        it('should store the user', () => {
            const action = actions.find((act) => act.type === userReceived.type && isEqual(act.payload, newUser))

            expect(action).not.toBeUndefined()
        })

        it('should set the banner to onUserAuthenticated', () => {
            const action = actions.find((act) => act.type === onUserAuthenticated.type)

            expect(action).not.toBeUndefined()
        })
    })

    describe('Wheh calling authenticate and the user is not retrieved', () => {
        let actions: PayloadAction<any>[]

        beforeEach(async () => {
            api.login.mockRejectedValueOnce()

            const store = mockStore(appInitialState)

            await store.dispatch(authenticate({ email: 'test@authenticate.com', password: '1234' }))

            actions = store.getActions()
        })

        it('should not store the user', () => {
            const action = actions.find((act) => act.type === userReceived.type)

            expect(action).toBeUndefined()
        })

        it('should set the banner to onUserAuthenticationError', () => {
            const action = actions.find((act) => act.type === onUserAuthenticationError.type)

            expect(action).not.toBeUndefined()
        })
    })
})
