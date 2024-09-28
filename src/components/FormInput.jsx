import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { css } from '@emotion/react'


const FormInput = ({y label, type, value, onChange, placeholder, isInvalid, errorMessage }) => {
  return (
    <div
              css={css`
                margin-bottom: 1.25rem;
              `}
            >
              <FormControl isInvalid={isEmailError}>
                <FormLabel
                  css={css`
                    font-size: 1rem;
                    font-weight: 500;
                    color: #2d3748;
                  `}
                >
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email to get started"
                  css={css`
                    margin-top: 0.625rem;
                    padding: 1rem;
                    width: 100%;
                    background-color: #f7fafc;
                    color: black;
                    border: 1px solid #edf2f7;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                    &:focus {
                      outline: none;
                      border-color: #3182ce;
                      background-color: white;
                    }
                  `}
                />
                {!isEmailError ? (
                  <FormHelperText>Email is required.</FormHelperText>
                ) : (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
            </div>

  )
}

export default FormInput