const {expect} = require('chai')
const home = require('../')

let resolveTests

// Node.js test cases from https://github.com/joyent/node/blob/master/test/simple/test-path.js
const isWindows = process.platform === 'win32'
if (isWindows) {
  // windows
  resolveTests =
    // arguments                                    result
    [
      [
        ['c:/blah\\blah', 'd:/games', 'c:../a'], 'c:\\blah\\a'
      ],
      [
        ['c:/ignore', 'd:\\a/b\\c/d', '\\e.exe'], 'd:\\e.exe'
      ],
      [
        ['c:/ignore', 'c:/some/file'], 'c:\\some\\file'
      ],
      [
        ['d:/ignore', 'd:some/dir//'], 'd:\\ignore\\some\\dir'
      ],
      [
        ['.'], process.cwd()
      ],
      [
        ['//server/share', '..', 'relative\\'], '\\\\server\\share\\relative'
      ],
      [
        ['c:/', '//'], 'c:\\'
      ],
      [
        ['c:/', '//dir'], 'c:\\dir'
      ],
      [
        ['c:/', '//server/share'], '\\\\server\\share\\'
      ],
      [
        ['c:/', '//server//share'], '\\\\server\\share\\'
      ],
      [
        ['c:/', '///some//dir'], 'c:\\some\\dir'
      ]
    ]
} else {
  // Posix
  resolveTests =
    // arguments                                    result
    [
      [
        ['/var/lib', '../', 'file/'], '/var/file'
      ],
      [
        ['/var/lib', '/../', 'file/'], '/file'
      ],
      [
        ['a/b/c/', '../../..'], process.cwd()
      ],
      [
        ['.'], process.cwd()
      ],
      [
        ['/some/dir', '.', '/absolute/'], '/absolute'
      ]
    ]
}

// var home = require('path')
const {resolve} = home
describe("home.resolve(), with no '~' path:", () => {
  resolveTests.forEach(c => {
    const args = c[0]
    const result = c[1]
    it(
      `normal: ${args.map(JSON.stringify).join(', ')
      } -> ${JSON.stringify(result)}`, () => {
        expect(resolve.apply(home, args)).to.equal(result)
      })
  })
})

let HOME
let homeResolveTests

if (isWindows) {
  HOME = process.env.USERPROFILE

  // windows
  homeResolveTests =
    // arguments                                    result
    [
      [
        ['~'], HOME
      ],
      [
        ['c:/blah\\blah', 'd:/games', 'c:../a'], 'c:\\blah\\a'
      ],
      [
        ['c:/ignore', 'd:\\a/b\\c/d', '\\e.exe'], 'd:\\e.exe'
      ],
      [
        ['c:/ignore', 'c:/some/file'], 'c:\\some\\file'
      ],
      [
        ['d:/ignore', 'd:some/dir//'], 'd:\\ignore\\some\\dir'
      ],
      [
        ['.'], process.cwd()
      ],
      [
        ['//server/share', '..', 'relative\\'], '\\\\server\\share\\relative'
      ],
      [
        ['c:/', '//'], 'c:\\'
      ],
      [
        ['c:/', '//dir'], 'c:\\dir'
      ],
      [
        ['c:/', '//server/share'], '\\\\server\\share\\'
      ],
      [
        ['c:/', '//server//share'], '\\\\server\\share\\'
      ],
      [
        ['c:/', '///some//dir'], 'c:\\some\\dir'
      ]
    ]
} else {
  ({HOME} = process.env)
  // Posix
  homeResolveTests =
    // arguments                                    result
    [
      [
        ['~'], HOME
      ],
      [
        ['~/var/lib', '../', 'file/'], `${HOME}/var/file`
      ],
      [
        ['~/var/lib', '/../', 'file/'], '/file'
      ],
      [
        ['~/some/dir', '.', '~/absolute/'], `${HOME}/absolute`
      ],
      [
        ['~/some/dir', '.', '/absolute/'], '/absolute'
      ]
    ]
}


describe('home():', () => {
  it('home(), should return home dir', () => {
    expect(home()).to.equal(HOME)
  })
})


describe("home.resolve(), with '~' path:", () => {
  homeResolveTests.forEach((c, i) => {
    const args = c[0]
    const result = c[1]
    it(`${args.map(JSON.stringify).join(', ')} -> ${JSON.stringify(result)}`, () => {
      expect(resolve.apply(home, args)).to.equal(result)
    })
  })
})
