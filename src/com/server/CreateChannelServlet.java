package com.server;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;
import com.shared.FieldVerifier;

/**
 * The server side implementation of the RPC service.
 */
@SuppressWarnings("serial")
public class CreateChannelServlet extends HttpServlet{
	
	private static ChannelService channelService = ChannelServiceFactory.getChannelService();
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String channelKey = req.getParameter("c");

		// Create a Channel using the 'channelKey' we received from the client
		String token = channelService.createChannel(channelKey);

		// Send the client the 'token' + the 'channelKey' this way the client
		// can start using the new channel
		resp.setContentType("application/json");
		StringBuffer sb = new StringBuffer();
		sb.append("{\"channelKey\":\"");
		sb.append(channelKey);
		sb.append("\",\"token\":\"");
		sb.append(token);
		sb.append("\"}");
		resp.getWriter().write(sb.toString());
	}
}
