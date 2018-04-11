/* eslint no-undef: "off" */

import Controller from '../app/src/controller'
import SymlinkCollector from '../app/src/collectSymlinks'
import { expect } from 'chai'
import Shell from '../app/src/shell'
const path = require('path')

console.log('Starting Test')

describe('TEST 1', () => {
  let controller, symLink
  let targetpath = process.cwd()
  beforeEach(function () {
    controller = new Controller(targetpath)
    symLink = new SymlinkCollector()
  })
  context('When .nsi.json is present', () => {
    it('check if file exist', () => {
      expect(controller.checkFile(path.join(targetpath, '/spec'), '.nsi.json')).to.equals(true)
    })
    it('install dependencies and re-link', () => {
      expect(controller.run())
    })
    it('install npm packages', () => {
      let packages = ['babel']
      controller = new Controller(targetpath, packages)
      expect(controller.run())
    })
    it('find root directory', () => {
      expect(controller.resolveRoot(path.join(targetpath, '/spec'))).to.equals(process.cwd())
    })
    it('check invalid root directory', () => {
      expect(controller.findRoot())
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
  context('Test Symlink Module', () => {
    it('testing execute', () => {
      symLink.execute('kjhtg', {}).then((data) => {
        expect(data)
      })
    })
  })
})
