---
title: 'Jmeter : Java Request 的测试方法'
toc: true
date: 2016-10-17 14:28:17
tags: Jmeter
categories: 编程
---
Jmeter 是一款简单的性能测试工具，并且开源。下载解压后运行
```
./bin/jmeter
```
即可使用，可参考 [Jmeter 使用入门](../../../../2016/09/07/Jmeter-使用入门/)。
![](http://7xqgix.com1.z0.glb.clouddn.com/jmeter.png)

### java request 测试
使用 jmeter 测试 java 程序，需要结合 jemter_java 编写测试代码。
```java
import org.apache.jmeter.config.Arguments;
import org.apache.jmeter.protocol.java.sampler.AbstractJavaSamplerClient;
import org.apache.jmeter.protocol.java.sampler.JavaSamplerContext;
import org.apache.jmeter.samplers.SampleResult;

import com.seeks.support.lxcernointerface.LxcernoClientUtils;

public class JavaRequest extends AbstractJavaSamplerClient {

	SampleResult result;
	String param;

	@Override
	public void setupTest(JavaSamplerContext context) {
		result = new SampleResult();
		super.setupTest(context);
	}

	@Override
	public Arguments getDefaultParameters() {
		Arguments params = new Arguments();
		params.addArgument("arg1", "0");
		return params;

	}

	@Override
	public SampleResult runTest(JavaSamplerContext arg0) {

		boolean success = true;
		result.sampleStart();
		param = arg0.getParameter("arg1");
		try {
			// do some test
		} catch (Exception e) {
			e.printStackTrace();
			success = false;
		} finally {
			result.sampleEnd();
			result.setSuccessful(success);
		}
		return result;

	}

	@Override
	public void teardownTest(JavaSamplerContext context) {
		super.teardownTest(context);
	}

}
```
![](http://7xqgix.com1.z0.glb.clouddn.com/javaRequest.png)
