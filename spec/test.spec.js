/* eslint no-undef: "off" */

import Controller from '../app/src/controller'
import { expect } from 'chai'
import Shell from '../app/src/shell'
const path = require('path')

console.log('Starting Test')

describe('TEST 1', () => {
  let controller
  let targetpath = process.cwd()
  beforeEach(function () {
    controller = new Controller(targetpath)
  })
  context('When .nsi.json is present', () => {
    it('check if file exist', () => {
      expect(controller.checkFile(path.join(targetpath, '/spec'), '.nsi.json')).to.equals(true)
    })
    it('install dependencies and re-link', () => {
      expect(controller.run())
    })
  })
  context('When .nsi.json is not present', () => {
    it('check if file exist', () => {
      expect(controller.checkFile(targetpath, '.nsi.json')).to.equals(false)
    })
    it('scan node modules, install dependencies and re-link', () => {
      expect(controller.run())
    })
  })
  context('Test Shell', () => {
    it('Shell output', () => {
      expect(Shell.print('Hello'))
    })
    it('Shell command', () => {
      Shell.shell('pwd').then((data) => {
        expect(data.stdout).to.equals(process.cwd())
      })
    })
    it('Shell Run , adding test submodule "a","b"', () => {
      expect(Shell.run(['a', 'b'], targetpath))
    })
  })
})
