import { describe, it, expect } from 'vitest'

describe('WXT Project Initialization', () => {
  it('should have correct package.json configuration', () => {
    const pkg = require('../../package.json')

    // Check required scripts
    expect(pkg.scripts).toHaveProperty('dev')
    expect(pkg.scripts).toHaveProperty('build')
    expect(pkg.scripts).toHaveProperty('test')

    // Check required dependencies
    expect(pkg.devDependencies).toHaveProperty('wxt')
    expect(pkg.devDependencies).toHaveProperty('typescript')
    expect(pkg.devDependencies).toHaveProperty('react')
    expect(pkg.devDependencies).toHaveProperty('vitest')

    // Check project metadata
    expect(pkg.name).toBe('gmail-label-manager-v2')
    expect(pkg.version).toBe('2.0.0')
    expect(pkg.type).toBe('module')
  })

  it('should have TypeScript configuration', () => {
    const tsConfig = require('../../tsconfig.json')

    // Check TypeScript configuration exists
    expect(tsConfig).toBeDefined()
    expect(tsConfig.compilerOptions).toBeDefined()
    expect(tsConfig.compilerOptions.target).toBe('ES2022')
    expect(tsConfig.compilerOptions.module).toBe('ESNext')
    expect(tsConfig.compilerOptions.moduleResolution).toBe('bundler')
  })

  it('should have WXT configuration', () => {
    // Since wxt.config.ts is a TypeScript file, we'll check if it exists
    const fs = require('fs')
    const path = require('path')

    const wxtConfigPath = path.resolve(__dirname, '../../wxt.config.ts')
    expect(fs.existsSync(wxtConfigPath)).toBe(true)
  })

  it('should have correct entrypoints structure', () => {
    const fs = require('fs')
    const path = require('path')

    // Check if entrypoints directory exists
    const entrypointsPath = path.resolve(__dirname, '../entrypoints')
    expect(fs.existsSync(entrypointsPath)).toBe(true)

    // Check if popup entrypoint exists
    const popupPath = path.resolve(entrypointsPath, 'popup')
    expect(fs.existsSync(popupPath)).toBe(true)

    // Check if background.ts exists
    const backgroundPath = path.resolve(entrypointsPath, 'background.ts')
    expect(fs.existsSync(backgroundPath)).toBe(true)
  })

  it('should have React components structure', () => {
    const fs = require('fs')
    const path = require('path')

    // Check if components directory exists
    const componentsPath = path.resolve(__dirname, '../components')
    expect(fs.existsSync(componentsPath)).toBe(true)
  })

  it('should have public assets directory', () => {
    const fs = require('fs')
    const path = require('path')

    // Check if public directory exists
    const publicPath = path.resolve(__dirname, '../../public')
    expect(fs.existsSync(publicPath)).toBe(true)

    // Check if icons directory exists
    const iconsPath = path.resolve(publicPath, 'icons')
    expect(fs.existsSync(iconsPath)).toBe(true)
  })
})