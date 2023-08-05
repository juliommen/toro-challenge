/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { ValidatorHelper } from './ValidationHelper'

describe('User account unit tests', () => {
  it('should be able to correctly check a valid CPF', async () => {
    expect(ValidatorHelper.checkCpfValidation('36749033008')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('89186073001')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('23780065002')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('99993430072')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('89074757090')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('08621743094')).toEqual(true)
    expect(ValidatorHelper.checkCpfValidation('93886334074')).toEqual(true)
  })

  it('should be able to correctly check an invalid CPF', async () => {
    expect(ValidatorHelper.checkCpfValidation('365.779.460-35')).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation(3657794603 as any)).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation('')).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation({} as any)).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation([] as any)).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation(undefined)).toEqual(false)
    expect(ValidatorHelper.checkCpfValidation(null)).toEqual(false)
  })

  it('should be able to correctly check if a value can be converted to integer', async () => {
    expect(ValidatorHelper.checkConvertionToPositiveInt('123')).toEqual(true)
  })

  it('should be able to correctly check if a value cannot be converted to integer', async () => {
    expect(ValidatorHelper.checkConvertionToPositiveInt('0')).toEqual(false)
    expect(ValidatorHelper.checkConvertionToPositiveInt('3-35')).toEqual(false)
    expect(ValidatorHelper.checkConvertionToPositiveInt('1a')).toEqual(false)
    expect(ValidatorHelper.checkConvertionToPositiveInt('1.1')).toEqual(false)
    expect(ValidatorHelper.checkConvertionToPositiveInt(1 as any)).toEqual(
      false,
    )
    expect(ValidatorHelper.checkConvertionToPositiveInt('')).toEqual(false)
    expect(ValidatorHelper.checkConvertionToPositiveInt({} as any)).toEqual(
      false,
    )
    expect(ValidatorHelper.checkConvertionToPositiveInt([] as any)).toEqual(
      false,
    )
    expect(ValidatorHelper.checkConvertionToPositiveInt(undefined)).toEqual(
      false,
    )
    expect(ValidatorHelper.checkConvertionToPositiveInt(null)).toEqual(false)
  })

  it('should be able to correctly check if a value is an positive integer', async () => {
    expect(ValidatorHelper.checkPositiveInteger(1)).toEqual(true)
  })

  it('should be able to correctly check if a value is not an positive integer', async () => {
    expect(ValidatorHelper.checkPositiveInteger(0)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger(1.1)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger('3-35' as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger('1a' as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger('1.1' as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger('' as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger({} as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger([] as any)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger(undefined)).toEqual(false)
    expect(ValidatorHelper.checkPositiveInteger(null)).toEqual(false)
  })
})
