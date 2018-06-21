module ApplicationHelper

  def nav_link(link_text, link_path, html_options = {})
    class_name = current_page?(link_path) ? 'active' : ''
    
    content_tag(:li, class: class_name) do
      link_to link_text, link_path, html_options
    end
  end

  def namespace_is?(name)
    controller.class.name.split("::").first == name
  end

  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: false
    }

    renderer = HTMLwithPygments.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end

end
