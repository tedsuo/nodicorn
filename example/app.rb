require 'sinatra/base'

class ExampleApp < Sinatra::Base
  get '/' do
    '<html><head><title>Nodicorn Test</title></head><body>&#9836; I was born a unicorn<br>I missed the ark but I could have sworn &#9836;<br>&#9836; you\'d wait for meeeeeee</body></html>'
  end
end
