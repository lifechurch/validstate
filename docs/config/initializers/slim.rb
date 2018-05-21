require 'rouge/plugins/redcarpet'

class MarkdownEngine < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
end

Slim::Embedded.set_default_options markdown: {
  renderer: MarkdownEngine.new,
  fenced_code_blocks: true
}
