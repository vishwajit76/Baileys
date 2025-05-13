import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import { UserFacingSocketConfig } from '../Types'
import { makeBusinessSocket } from './business'
import { makeRegistrationSocket } from './registration'

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => (
	(config.mobile ? makeRegistrationSocket : makeBusinessSocket)({
		...DEFAULT_CONNECTION_CONFIG,
		...config
	})
)

export default makeWASocket